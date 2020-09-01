export function getHashRouterPath(path) {
    return '/widget';
}

export function getNavbarTabPath(path) {
    let commonPart = '/widget/';
    return path.substring(commonPart.length);
}

export function getRouterPath(path) {
    return '/platform/#' + getHashRouterPath(path);
}


