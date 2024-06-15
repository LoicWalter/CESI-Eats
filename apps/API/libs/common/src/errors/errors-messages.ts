export enum ErrorsMessages {
  USER_ALREADY_EXISTS = 'Cet utilisateur est déjà enregistré.',
  USER_SUSPENDED = 'Ce compte est suspendu.',
  USER_NOT_FOUND = 'Utilisateur introuvable.',
  USER_NOT_FOUND_IN_CONTEXT = 'Utilisateur introuvable dans le contexte.',
  INVALID_CREDENTIALS = 'Identifiants invalides.',
  USER_DONT_HAVE_REQUIRED_ROLES = "Cet utilisateur n'a pas les rôles requis.",
  INVALID_TOKEN = 'Token invalide.',
  INVALID_REFRESH = 'Refresh token invalide.',
  AUTH_HEADER_NOT_PROVIDED = 'Authorization header non fourni.',
  FILE_TOO_LARGE = 'Fichier trop volumineux.',
  INVALID_FILE_TYPE = 'Type de fichier invalide.',
}
