import { Injectable } from '@angular/core';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(payload: ContactPayload, onProgress: (percent: number) => void): Promise<void> {
    let fakeProgress = 0;
    const tick = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 10, 90);
      onProgress(fakeProgress);
    }, 120);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? 'Échec de l’envoi');
      }

      clearInterval(tick);
      onProgress(100);
    } catch (error) {
      clearInterval(tick);
      throw error;
    }
  }
}