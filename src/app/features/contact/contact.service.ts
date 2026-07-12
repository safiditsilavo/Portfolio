import { Injectable } from '@angular/core';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Simule l'envoi d'un message. Le jour où tu branches un vrai service
   * (EmailJS, Formspree, ta propre API...), seul CE fichier change —
   * le composant Contact n'a rien à savoir de "comment" c'est envoyé.
   */
  send(payload: ContactPayload, onProgress: (percent: number) => void): Promise<void> {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 120);
    });
  }
}