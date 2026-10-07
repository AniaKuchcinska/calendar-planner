import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';
import userEvent from '@testing-library/user-event';

describe('Calendar', () => {
  it('displays the current month and year', () => {
    render(<Calendar />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('displays all days of the month', () => {
    render(<Calendar initialDate={new Date(2026, 8, 9)} />);

    expect(
      screen.getByRole('button', {
        name: 'Ajouter un événement le 1 septembre 2026',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Ajouter un événement le 30 septembre 2026',
      }),
    ).toBeInTheDocument();
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

  it('creates and displays an event on a selected day', async () => {
    const user = userEvent.setup();
    render(<Calendar initialDate={new Date(2026, 8, 9)} />);
    await user.click(
      screen.getByRole('button', {
        name: 'Ajouter un événement le 9 septembre 2026',
      }),
    );
    expect(
      screen.getByRole('form', { name: 'Ajouter un événement' }),
    ).toBeInTheDocument();
    await user.type(
      screen.getByRole('textbox', { name: 'Titre de l’événement' }),
      'Réunion équipe',
    );
    await user.click(screen.getByRole('button', { name: 'Ajouter' }));
    expect(
      screen.getByRole('button', {
        name: "Modifier l'événement Réunion équipe",
      }),
    ).toBeInTheDocument();
  });

  it('deletes an event', async () => {
    const user = userEvent.setup();
    render(<Calendar initialDate={new Date(2026, 8, 9)} />);
    await user.click(
      screen.getByRole('button', {
        name: 'Ajouter un événement le 9 septembre 2026',
      }),
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Titre de l’événement' }),
      'Réunion équipe',
    );
    await user.click(screen.getByRole('button', { name: 'Ajouter' }));
    await user.click(
      screen.getByRole('button', {
        name: "Modifier l'événement Réunion équipe",
      }),
    );
    expect(
      screen.getByRole('form', { name: 'Supprimer un événement' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Supprimer' }));
    expect(
      screen.queryByRole('button', {
        name: "Modifier l'événement Réunion équipe",
      }),
    ).not.toBeInTheDocument();
  });
});
