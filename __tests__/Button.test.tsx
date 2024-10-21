import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Button from '../src/app/components/Button';
import '@testing-library/jest-dom';

describe("button", () => {
  it('renders that the button exists', () => {
    const btn = render(<Button>Hello!</Button>);
    const role = btn.getByRole('button');
    expect(role).toBeInTheDocument();
  });

  it('works the onclick', () => {
    const handleClick = jest.fn();
    const btn = render(<Button onClick={handleClick}>Hello!</Button>);
    const role = btn.getByRole('button');
    fireEvent.click(role);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly the variant secondary', () => {
    const btn = render(<Button variant='secondary'>Hello!</Button>);
    const role = btn.getByRole('button');
    expect(role).toHaveClass('bg-gray-500');
  });

  it('is disable when it is loading', () => {
    const btn = render(<Button loading={true}>Hello!</Button>);
    const role = btn.getByRole('button');
    expect(role).toBeDisabled()
  });
});