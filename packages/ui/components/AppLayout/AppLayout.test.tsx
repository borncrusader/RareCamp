import { render, screen } from '@testing-library/react'
import AppLayout from './AppLayout'

describe('AppLayout', () => {
  test('renders Applayout component', () => {
    render(
      <AppLayout>
        <>Layout</>
      </AppLayout>,
    )

    expect(screen.getByTestId('AppLayout-logo')).toHaveClass('logo')
  })
})
