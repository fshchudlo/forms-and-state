import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    public parse(url: string): UrlTree {
        const urlParts = url.split('?');
        urlParts[0] = urlParts[0].toLowerCase();
        return super.parse(urlParts.join('?'));
    }
}
