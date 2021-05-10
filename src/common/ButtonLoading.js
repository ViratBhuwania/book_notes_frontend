import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const ButtonLoading = () => {

    
        return (
            <Button variant="primary" disabled style={{ width: '80px' }}>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            </Button>
        );
    
}

export default ButtonLoading;