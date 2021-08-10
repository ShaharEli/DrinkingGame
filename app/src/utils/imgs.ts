export const checkImage = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = function () {
      if (request.status === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
