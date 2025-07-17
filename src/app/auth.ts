// src/app/auth.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface Única para o Usuário
export interface User {
  id: number;
  nome: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  cnCosplayRank: string;
  cnCoins: number;
  totalDoado: number;
}

// "Banco de dados" de doações
const DADOS_DOACOES: { name: string, amount: number }[] = [
    { name: 'Andreza Carneiro', amount: 10 },
    { name: 'Rafael Santos', amount: 10 },
    { name: 'Chefinhodzaum', amount: 60 },
    { name: 'Mireli', amount: 70 },
    { name: 'Elisa Cruz', amount: 635 },
    { name: 'Cloud', amount: 635 },
    { name: 'Loggya', amount: 300 },
    { name: 'Zuza', amount: 10 },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private router: Router) {
    const storedUser = (typeof localStorage !== 'undefined') ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null { return this.currentUserSubject.value; }
  public get isLoggedIn(): boolean { return !!this.currentUserValue; }
  public get isAdmin(): boolean { return !!this.currentUserValue?.isAdmin; }

  register(userData: any): { success: boolean; message: string } {
    const users = this.getUsersFromStorage();
    if (users.some(user => user.email === userData.email)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }
    const newUser: User = { id: new Date().getTime(), nome: `${userData.nome} ${userData.sobrenome || ''}`.trim(), email: userData.email, password: userData.password, isAdmin: false, cnCosplayRank: 'Não ranqueado', cnCoins: 0, totalDoado: 0 };
    users.push(newUser);
    this.saveUsersToStorage(users);
    this.login({ email: newUser.email, password: newUser.password });
    return { success: true, message: 'Usuário registrado e logado com sucesso!' };
  }

  login(credentials: { email: string; password?: string }): { success: boolean; message: string } {
    this.syncAllUsersData();
    const users = this.getUsersFromStorage();
    let foundUser: User | undefined;
    if (credentials.email === 'admin@cosnection.com.br' && credentials.password === 'Planetalua01#') {
      foundUser = users.find(u => u.email === credentials.email);
      if (!foundUser) {
        foundUser = { id: 0, nome: 'Admin', email: 'admin@cosnection.com.br', password: 'Planetalua01#', isAdmin: true, cnCosplayRank: 'Admin', cnCoins: 9999, totalDoado: 99999 };
        users.push(foundUser);
        this.saveUsersToStorage(users);
      }
    } else {
      foundUser = users.find(user => user.email === credentials.email && user.password === credentials.password);
    }
    if (foundUser) { this.setSession(foundUser); return { success: true, message: 'Login bem-sucedido!' }; }
    return { success: false, message: 'E-mail ou senha inválidos.' };
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') { localStorage.removeItem('currentUser'); localStorage.removeItem('authToken'); }
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  private setSession(user: User): void {
    const userToStore = { ...user };
    delete userToStore.password;
    if (typeof localStorage !== 'undefined') { localStorage.setItem('currentUser', JSON.stringify(userToStore)); localStorage.setItem('authToken', `fake-jwt-token-for-${user.id}`); }
    this.currentUserSubject.next(userToStore);
  }

  // --- MÉTODOS COMPLETOS PARA O PAINEL DE ADMIN ---

  getUsers(): User[] {
    return this.getUsersFromStorage();
  }

  updateUser(updatedUser: User): boolean {
    let users = this.getUsersFromStorage();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      // Mantém a senha original se não for alterada no formulário de edição
      updatedUser.password = updatedUser.password || users[index].password;
      users[index] = updatedUser;
      this.saveUsersToStorage(users);
      // Se o usuário atualizado for o que está logado, atualiza a sessão
      if (this.currentUserValue?.id === updatedUser.id) {
        this.setSession(updatedUser);
      }
      return true;
    }
    return false;
  }

  deleteUser(id: number): boolean {
    let users = this.getUsersFromStorage();
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    if (users.length < initialLength) {
      this.saveUsersToStorage(users);
      return true;
    }
    return false;
  }

  createUser(userData: any): User | null {
    const users = this.getUsersFromStorage();
    if (users.some(user => user.email === userData.email)) {
      console.error('Tentativa de criar usuário com e-mail duplicado.');
      return null;
    }
    const newUser: User = {
      id: new Date().getTime(),
      nome: `${userData.nome} ${userData.sobrenome || ''}`.trim(),
      email: userData.email,
      password: userData.password,
      isAdmin: userData.isAdmin || false,
      cnCosplayRank: 'Não ranqueado',
      cnCoins: 0,
      totalDoado: 0
    };
    users.push(newUser);
    this.saveUsersToStorage(users);
    return newUser;
  }

  // --- MÉTODOS DE SINCRONIZAÇÃO E ARMAZENAMENTO ---

  private syncAllUsersData(): void {
    let users = this.getUsersFromStorage();
    users = users.map(user => {
      const totalDoado = DADOS_DOACOES
        .filter(d => d.name.toLowerCase() === user.nome.toLowerCase())
        .reduce((sum, d) => sum + d.amount, 0);
      const cnCoins = Math.floor(totalDoado / 10);
      return { ...user, totalDoado, cnCoins };
    });
    this.saveUsersToStorage(users);
  }

  private getUsersFromStorage(): User[] {
    const data = (typeof localStorage !== 'undefined') ? localStorage.getItem('users') : '[]';
    return JSON.parse(data || '[]');
  }

  private saveUsersToStorage(users: User[]): void {
    if (typeof localStorage !== 'undefined') { localStorage.setItem('users', JSON.stringify(users)); }
  }
}

// Guarda de Rota (AuthGuard)
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn;
    const isAdmin = this.authService.isAdmin;
    const protectedRoutes = ['/perfil', '/admin'];

    if (isLoggedIn && (state.url === '/login' || state.url === '/cadastro')) {
      return this.router.createUrlTree(['/perfil']);
    }
    if (protectedRoutes.some(r => state.url.startsWith(r)) && !isLoggedIn) {
      return this.router.createUrlTree(['/login']);
    }
    if (state.url.startsWith('/admin') && !isAdmin) {
      return this.router.createUrlTree(['/home']);
    }
    return true;
  }
}
