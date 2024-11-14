import dns from 'dns';


export const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
        return false;
    }

    if (!uppercaseRegex.test(password)) {
        return false;
    }

    if (!numberRegex.test(password)) {
        return false;
    }

    if (!specialCharRegex.test(password)) {
        return false;
    }

    return true;
}


export const validateEmail = (email: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return Promise.resolve(false);
    }

    // חילוץ הדומיין מהאימייל
    const domain = email.split('@')[1];

    // בדיקת קיום רשומות MX לדומיין (המצביעות על יכולת קבלת אימיילים)
    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}


export const validateName = (name: string): boolean => {
    if (!name || name.trim().length === 0) {
        return false;
    }

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(name)) {
        return false;
    }

    if (name.length < 2 || name.length > 50) {
        return false;
    }

    return true;
}