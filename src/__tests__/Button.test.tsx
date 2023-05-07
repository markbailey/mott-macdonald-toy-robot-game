// Write a test for the Button component
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

let button: HTMLButtonElement;
const buttonClicked = jest.fn();

describe('Button component', () => {
  beforeAll(() => {
    const textContent = 'My Button';
    render(<Button>{textContent}</Button>);
    button = screen.getByText(textContent);
    button.addEventListener('click', buttonClicked);
  });

  it('Verify that the component renders', async () => {
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('Verify the onClick event triggers', async () => {
    button.click();
    expect(buttonClicked).toBeCalledTimes(1);
  });
});
