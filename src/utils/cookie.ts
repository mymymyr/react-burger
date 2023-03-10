function setCookie (name: string, value?: string, props?: {
  path?: string
  expires?: Date | string | number
  [name: string]: Date | string | number | undefined | boolean
}) {
  props = props ?? {};
  props.path = '/react-burger';
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value ?? '');
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== undefined && propValue !== true) {
      updatedCookie += `=${propValue?.toString()}`;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie (name: string) {
  const matches = document.cookie.match(
    /* eslint-disable */
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
        /* eslint-enable */
  );
  return (matches != null) ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie (name: string) {
  setCookie(name, '', { expires: -1 });
}

export { setCookie, getCookie, deleteCookie };
