import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';

export const onSideNavChange = trigger('onSideNavChange', [
  state(
    'close',
    style({
      width: '55px',
    }),
  ),
  state(
    'open',
    style({
      width: '300px',
    }),
  ),
  transition('close => open', animate('250ms ease-in-out')),
  transition('open => close', animate('250ms ease-in-out')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
  state(
    'close',
    style({
      'margin-left': '55px',
    }),
  ),
  state(
    'open',
    style({
      'margin-left': '300px',
    }),
  ),
  transition('close => open', animate('250ms ease-in-out')),
  transition('open => close', animate('250ms ease-in-out')),
]);

export const animateText = trigger('animateText', [
  state(
    'hide',
    style({
      display: 'none',
      opacity: 0,
    }),
  ),
  state(
    'show',
    style({
      display: 'block',
      opacity: 1,
    }),
  ),
  transition('hide => show', animate('50ms ease-in')),
  transition('show => hide', animate('0ms ease-out')),
]);

export const animateLogo = trigger('animateLogo', [
  state(
    'hide',
    style({
      width: '50px',
      height: '39px',
      'margin-right': '0px',
    }),
  ),
  state(
    'show',
    style({
      width: '64px',
      height: '52px',
      'margin-right': '20px',
    }),
  ),
  transition('hide => show', animate('100ms ease-in')),
  transition('show => hide', animate('100ms ease-out')),
]);
