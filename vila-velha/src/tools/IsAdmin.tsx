//Apenas retorna se o usuário é administrador
export default function useIsAdmin() {
  return localStorage.getItem('isAdmin') === 'true';
}