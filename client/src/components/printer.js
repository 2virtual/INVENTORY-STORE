import React, {useState, useEffect} from 'react';

function PrintConfirmation() {
    const [isLoading, setIsLoading] = useState(true);

    const handleMessage = (event) => {
        if (event.data.action === 'receipt-loaded') {
            setIsLoading(false);
        }
    };

    const printIframe = (id) => {
        const iframe = document.frames ? document.frames[id] : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        return false;
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <>
            <iframe id="notice" src="/components/noticeBoard" style={{display: 'none'}} title="attendance" />
            <button onClick={() => printIframe('notice')}>{isLoading ? 'Loading...' : 'Print notice'}</button>
        </>
    );
}

export default PaymentConfirmation;