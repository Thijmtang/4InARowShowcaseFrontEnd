import React, { HTMLAttributes } from 'react';
import '../assets/Form.scss';

export const FormCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({children, ...rest}) => {
  return (
    <div {...rest} className='form-container'>{children}</div>
  )
}
