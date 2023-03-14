import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Checkout() {
  const [searchParams] = useSearchParams();

  const planId = searchParams.get('planId');

  useEffect(() => {
    window.Culqi.settings({
      title: 'Speeky',
      currency: 'USD',
    });

    window.Culqi.options({
      lang: 'auto',
      installments: true,
      paymentMethods: {
        tarjeta: true,
        yape: false,
        bancaMovil: false,
        agente: false,
        billetera: false,
        cuotealo: false,
      },
    });

    window.culqi = () => {
      if (window.Culqi.error) {
        return console.log('Error : ', window.Culqi.error);
      }

      const token = window.Culqi.token.id;
      console.log('Se ha creado un Token: ', token);

      window.Culqi.close();
    };
  }, [planId]);

  function payHandler() {
    window.Culqi.open();
  }

  return (
    <main>
      <h1>Checkout</h1>
      <section>
        <h3>Plan {planId}</h3>
        <button onClick={payHandler}>Buy</button>
      </section>
    </main>
  );
}

export default Checkout;
