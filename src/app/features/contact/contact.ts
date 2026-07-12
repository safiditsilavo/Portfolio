import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-2xl animate-fadeIn">
      <div class="bg-[#0a0a0a] border border-gray-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full filter blur-3xl opacity-10" [class]="themeStore.themeColor().accent"></div>

        <h2 class="text-2xl font-bold text-white mb-2 font-mono">Initialize System Handshake</h2>
        <p class="text-gray-400 text-sm mb-6 font-sans">Establish secure socket protocol connection directly to my inbox.</p>

        <form class="space-y-5 font-mono text-xs" (submit)="onSubmit($event)">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-bold uppercase tracking-wider" [class]="themeStore.themeColor().text">/usr/name</label>
              <input type="text"
                     [value]="formName()"
                     (input)="formName.set($any($event.target).value)"
                     required
                     class="w-full bg-[#050505] border border-gray-800 rounded-lg p-3.5 text-gray-300 focus:outline-none focus:ring-1 focus:border-current"
                     [class]="themeStore.themeColor().focusRing"
                     placeholder="Jane Doe" />
            </div>
            <div>
              <label class="block mb-2 font-bold uppercase tracking-wider" [class]="themeStore.themeColor().text">/usr/email</label>
              <input type="email"
                     [value]="formEmail()"
                     (input)="formEmail.set($any($event.target).value)"
                     required
                     class="w-full bg-[#050505] border border-gray-800 rounded-lg p-3.5 text-gray-300 focus:outline-none focus:ring-1 focus:border-current"
                     [class]="themeStore.themeColor().focusRing"
                     placeholder="jane@example.com" />
            </div>
          </div>
          <div>
            <label class="block mb-2 font-bold uppercase tracking-wider" [class]="themeStore.themeColor().text">/usr/message</label>
            <textarea rows="4"
                      [value]="formMessage()"
                      (input)="formMessage.set($any($event.target).value)"
                      required
                      class="w-full bg-[#050505] border border-gray-800 rounded-lg p-3.5 text-gray-300 focus:outline-none focus:ring-1 focus:border-current"
                      [class]="themeStore.themeColor().focusRing"
                      placeholder="Write your transmission..."></textarea>
          </div>

          @if (isSending()) {
            <div class="space-y-2">
              <div class="flex justify-between text-gray-400 font-mono text-[10px]">
                <span>TRANSMITTING PACKET...</span>
                <span>{{ sendProgress() }}%</span>
              </div>
              <div class="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                <div class="h-full transition-all duration-100" [class]="themeStore.themeColor().accent" [style.width.%]="sendProgress()"></div>
              </div>
            </div>
          } @else if (sendSuccess()) {
            <div class="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-center font-bold">
              TRANSMISSION SUCCESSFUL! PACKET RECEIVED.
            </div>
          }

          <button type="submit"
                  [disabled]="isSending() || sendSuccess()"
                  class="w-full font-bold py-3.5 rounded-lg transition-all flex items-center justify-center space-x-2 text-black cursor-pointer shadow-lg hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  [class]="themeStore.themeColor().accent">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>SEND_PACKET_TRANSMISSION()</span>
          </button>
        </form>
      </div>
    </section>
  `,
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