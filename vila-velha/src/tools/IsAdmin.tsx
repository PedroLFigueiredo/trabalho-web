export default function useIsAdmin() {
  return localStorage.getItem('isAdmin') === 'true';
}