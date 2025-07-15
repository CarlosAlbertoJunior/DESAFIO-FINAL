// src/app/auth.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

// Interface de dados do usuário ATUALIZADA
interface UserData {
  nome: string;
  email: string;
  token?: string;
  isAdmin?: boolean; // <--- NOVA PROPRIEDADE: Indica se o usuário é admin
}

// Simulação de base de dados de usuários (para AdminPanelComponent)
interface MockUser {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
}

const MOCK_USERS: MockUser[] = [
  { id: 1, nome: 'Admin Principal', email: 'admin@cosnection.com.br', isAdmin: true },
  { id: 2, nome: 'Usuário Teste 1', email: 'usuario1@teste.com', isAdmin: false },
  { id: 3, nome: 'Usuário Teste 2', email: 'usuario2@teste.com', isAdmin: false }
];
let nextUserId = 4; // Para novos cadastros simulados

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  private _currentUser: UserData | null = null;

  constructor(private router: Router,private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this._currentUser = JSON.parse(storedUser);
        this._isLoggedIn = true;
      }
    }
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get currentUser(): UserData | null {
    return this._currentUser;
  }

  // Novo getter para verificar se o usuário atual é admin
  get isAdmin(): boolean {
    return this._currentUser ? this._currentUser.isAdmin === true : false;
  }

  register(userData: any): Observable<any> {
    console.log('AuthService: Simulação de registro para', userData.email);
    // Simula a adição de um novo usuário à lista de usuários mock
    const newUser: MockUser = {
      id: nextUserId++,
      nome: userData.nome,
      email: userData.email,
      isAdmin: false // Novos usuários não são admin por padrão
    };
    MOCK_USERS.push(newUser);
    console.log('AuthService: Usuário adicionado à lista mock:', newUser);

    return of({ success: true, message: 'Usuário registrado com sucesso!' }).pipe(
      delay(500)
    );
  }

  login(email: string, senha: string, userData: UserData): Observable<UserData> {
    console.log('AuthService: Tentando fazer login...', email);

    // Validação de credenciais para admin
    if (email === 'admin@cosnection.com.br' && senha === 'Planetalua01#') {
      const user: UserData = {
        nome: 'Admin', // Nome fixo para o admin
        email: email,
        token: 'fake-admin-jwt-token-123',
        isAdmin: true // <--- DEFINIDO COMO ADMIN
      };
      return of(user).pipe(
        delay(500),
        tap(loggedInUser => {
          this._isLoggedIn = true;
          this._currentUser = loggedInUser;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
          }
          console.log('AuthService: Login ADMIN bem-sucedido!', loggedInUser);
        })
      );
    }
    // Validação de credenciais para usuários comuns (simulados)
    else if (MOCK_USERS.some(u => u.email === email && u.isAdmin === false && senha === '12345678')) { // Senha padrão para usuários comuns
      const loggedInMockUser = MOCK_USERS.find(u => u.email === email);
      if (loggedInMockUser) {
        const user: UserData = {
          nome: loggedInMockUser.nome,
          email: loggedInMockUser.email,
          token: 'fake-user-jwt-token-456',
          isAdmin: false
        };
        return of(user).pipe(
          delay(500),
          tap(loggedInUser => {
            this._isLoggedIn = true;
            this._currentUser = loggedInUser;
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            }
            console.log('AuthService: Login de usuário comum bem-sucedido!', loggedInUser);
          })
        );
      }
    }
    // Credenciais inválidas para qualquer outro caso
    return new Observable<UserData>(observer => {
      observer.error(new Error('Credenciais inválidas.'));
    }).pipe(delay(500));
  }

  logout(): void {
    this._isLoggedIn = false;
    this._currentUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/home']); // Redireciona para o login após o logout
    console.log('AuthService: Usuário deslogado.');
  }

  // === MÉTODOS PARA GERENCIAMENTO DE USUÁRIOS (para AdminPanelComponent) ===
  getUsers(): Observable<MockUser[]> {
    return of(MOCK_USERS).pipe(delay(200)); // Simula buscar todos os usuários
  }

  getUserById(id: number): Observable<MockUser | undefined> {
    const user = MOCK_USERS.find(u => u.id === id);
    return of(user).pipe(delay(100)); // Simula buscar um usuário
  }

  updateUser(updatedUser: MockUser): Observable<boolean> {
    const index = MOCK_USERS.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      MOCK_USERS[index] = { ...updatedUser }; // Atualiza o usuário
      console.log('AuthService: Usuário atualizado (mock):', MOCK_USERS[index]);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  deleteUser(id: number): Observable<boolean> {
    const initialLength = MOCK_USERS.length;
    const newUsers = MOCK_USERS.filter(u => u.id !== id);
    MOCK_USERS.splice(0, MOCK_USERS.length, ...newUsers); // Remove o usuário
    console.log('AuthService: Usuário deletado (mock). Nova lista:', MOCK_USERS);
    return of(MOCK_USERS.length < initialLength).pipe(delay(300));
  }

  createUser(userData: { nome: string, email: string, isAdmin: boolean }): Observable<MockUser> {
    const newUser: MockUser = {
      id: nextUserId++,
      nome: userData.nome,
      email: userData.email,
      isAdmin: userData.isAdmin
    };
    MOCK_USERS.push(newUser);
    console.log('AuthService: Novo usuário criado (mock):', newUser);
    return of(newUser).pipe(delay(300));
  }
}

// Seu GUARDA DE ROTA AuthGuard
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn && (state.url === '/login' || state.url === '/cadastro')) {
      console.log('AuthGuard: Usuário logado tentando acessar login/cadastro. Redirecionando para home.');
      return this.router.createUrlTree(['/home']);
    }

    if (!this.authService.isLoggedIn && (state.url !== '/login' && state.url !== '/cadastro' && state.url !== '/admin')) {
      console.log('AuthGuard: Usuário NÃO está logado tentando acessar rota protegida. Redirecionando para login.');
      return this.router.createUrlTree(['/login']);
    }

    // Adicionado: Se estiver tentando acessar '/admin' e NÃO for admin, redireciona
    if (state.url === '/admin' && !this.authService.isAdmin) {
      console.log('AdminGuard: Usuário NÃO é admin tentando acessar painel admin. Redirecionando para home.');
      return this.router.createUrlTree(['/home']); // Redireciona para home ou login, conforme preferir
    }

    return true;
  }
}
