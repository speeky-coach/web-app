import React from 'react';
import { Link } from 'react-router-dom';

function PlansAndPricing() {
  return (
    <main>
      <h1>Plans And Pricing</h1>
      <section>
        <article>
          <Link to="/checkout?planId=0">Plan Basic</Link>
        </article>

        <article>
          <Link to="/checkout?planId=1">Plan Premium</Link>
        </article>
      </section>
    </main>
  );
}

export default PlansAndPricing;
