import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeStore } from '../../core/theme/theme.store';
import { SOCIAL_LINKS } from '../../core/social-links';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  themeStore = inject(ThemeStore);
  private contactService = inject(ContactService);

  protected readonly socialLinks = SOCIAL_LINKS;

  formName = signal('');
  formEmail = signal('');
  formMessage = signal('');
  isSending = signal(false);
  sendProgress = signal(0);
  sendSuccess = signal(false);
  sendError = signal<string | null>(null);

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.isSending() || this.sendSuccess()) return;

    this.isSending.set(true);
    this.sendProgress.set(0);
    this.sendError.set(null);

    try {
      await this.contactService.send(
        { name: this.formName(), email: this.formEmail(), message: this.formMessage() },
        (percent) => this.sendProgress.set(percent),
      );

      this.sendSuccess.set(true);
      this.formName.set('');
      this.formEmail.set('');
      this.formMessage.set('');
      setTimeout(() => this.sendSuccess.set(false), 5000);
    } catch {
      this.sendError.set('La transmission a échoué. Réessaie dans un instant.');
    } finally {
      this.isSending.set(false);
    }
  }
}