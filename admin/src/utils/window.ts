type Params = {
    [key: string]: string
}

export function pushParams(params: Params[]) {
    const url = new URL(window.location.href);
    
    params.forEach(param => {
        url.searchParams.append(param.key, param.value);
    });

    window.history.pushState({}, '', url.toString());
  }