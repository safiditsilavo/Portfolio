import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class Contact {
  themeStore = inject(ThemeStore);
  private contactService = inject(ContactService);

  formName = signal('');
  formEmail = signal('');
  formMessage = signal('');
  isSending = signal(false);
  sendProgress = signal(0);
  sendSuccess = signal(false);

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.isSending() || this.sendSuccess()) return;

    this.isSending.set(true);
    this.sendProgress.set(0);

    await this.contactService.send(
      { name: this.formName(), email: this.formEmail(), message: this.formMessage() },
      (percent) => this.sendProgress.set(percent),
    );

    this.isSending.set(false);
    this.sendSuccess.set(true);
    this.formName.set('');
    this.formEmail.set('');
    this.formMessage.set('');

    setTimeout(() => this.sendSuccess.set(false), 5000);
  }
}