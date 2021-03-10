import { Injectable } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';
// import { ConfigService } from '@nestjs/config';
import { IMailGunData } from './interface/mail.interface';

let api_key = 'cdf5adc4701049e76a49b675f5c49d1e-07bc7b05-90aadb82'
let domain = 'sandbox2e39451cc8cd4590811363cdba133f38.mailgun.org'

@Injectable()
export class MailService {
    private mg: Mailgun.Mailgun;

    constructor( ) {
        this.mg = Mailgun({
            apiKey: api_key,
            domain: domain
        });
    }

    send(data: IMailGunData): Promise<Mailgun.messages.SendResponse> {
        return new Promise((res, rej) => {
            this.mg.messages().send(data, function(error, body) {
                if (error) {
                    console.log("error");
                    
                    rej(error);
                }
                res(body);
                console.log(body);
                
            });
        });
    }
}