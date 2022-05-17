import { Ong } from "../models/ong.model";

export class Security {
    public static set(ong: Ong, token: string) {
        const data = JSON.stringify(ong);

        localStorage.setItem('onguser', btoa(data));
        localStorage.setItem('ongtoken', token);
    }

    public static setOng(ong: Ong) {
        const data = JSON.stringify(ong);
        localStorage.setItem('onguser', btoa(data));
    }

    public static setToken(token: string) {
        localStorage.setItem('ongtoken', token);
    }

    public static getOng(): Ong {
        const data = localStorage.getItem('onguser');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null as any;
        }
    }

    public static getToken(): string {
        const data = localStorage.getItem('ongtoken');
        if (data) {
            return data;
        } else {
            return null as any;
        }
    }

    public static hasToken(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }

    public static clear() {
        localStorage.removeItem('onguser');
        localStorage.removeItem('ongtoken');
    }
}