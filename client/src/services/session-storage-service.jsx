const SESSION_IDENTIFIER = 'session';

function getSession() {
  const session = JSON.parse(sessionStorage.getItem(SESSION_IDENTIFIER));
  return session;
}

export function getSessionStorageObject(object) {
  const session = getSession();
  return session ? session[object] : null;
}

export function setSessionStorageObject(object, objectValue) {
  let session = getSession();

  if (!session) {
    session = {};
  }
  session[object] = objectValue;

  sessionStorage.setItem(SESSION_IDENTIFIER, JSON.stringify(session));
}

export function destroySession() {
  sessionStorage.removeItem(SESSION_IDENTIFIER);
}
