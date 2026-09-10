import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

describe('Calendar', () => {
  it('displays the current month and year', () => {
    render(<Calendar />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('displays the first day of the month', () => {
    render(<Calendar initialDate={new Date(2026, 8, 9)} />);
    expect(screen.getByLabelText('9 septembre 2026')).toBeInTheDocument();
  });

  it('navigates to the next month', async () => {
    const user = userEvent.setup();

    render(<Calendar initialDate={new Date(2026, 8, 9)} />);

    expect(
      screen.getByRole('heading', { name: 'septembre 2026' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mois suivant' }));

    expect(
      screen.getByRole('heading', { name: 'octobre 2026' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mois précédent' }));

    expect(
      screen.getByRole('heading', { name: 'septembre 2026' }),
    ).toBeInTheDocument();
  });

  it('navigates to the previous month', async () => {
    const user = userEvent.setup();

    render(<Calendar initialDate={new Date(2026, 8, 9)} />);

    expect(
      screen.getByRole('heading', { name: 'septembre 2026' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Mois précédent' }));

    expect(
      screen.getByRole('heading', { name: 'août 2026' }),
    ).toBeInTheDocument();
  });
});
