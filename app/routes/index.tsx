import styles from '~/styles/pages/index/index.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ];
}

export default function Index() {
  return (
    <>
      <h1 className="mt-8 mb-8">{'/* Aprende y crea aplicaciones */'}</h1>
      <section className="grid grid-cols-2" data-testid="window-questions">
        <section className="code-editor animate smallToBig">
          <div className="title-bar">
            <div className="title-bar__btn title-bar__btn--red"></div>
            <div className="title-bar__btn title-bar__btn--yellow"></div>
            <div className="title-bar__btn title-bar__btn--green"></div>
          </div>
          <div className="code-wrapper">
            <div className="line-numbers">
              <pre className="line-numbers__item">1</pre>
              <pre className="line-numbers__item">2</pre>
              <pre className="line-numbers__item">3</pre>
              <pre className="line-numbers__item">4</pre>
              <pre className="line-numbers__item">5</pre>
              <pre className="line-numbers__item">6</pre>
              <pre className="line-numbers__item">7</pre>
            </div>
            <div className="code-content">
              <pre className="pre-code"><code className="code yellow">function </code><code className="code green">ask</code><code className="code pink">(</code><code className="code blue">question</code><code className="code pink">) {'{ ... }'}</code></pre>
              <pre className="pre-code code-blank-line"> </pre>
              <pre className="pre-code"><code className="code green">ask</code><code className="code blue"></code><code className="code pink">(</code><code>'¿Programación web para crear aplicaciones?'</code><code className="code pink">);</code></pre>
              <pre className="pre-code"><code className="code green">ask</code><code className="code pink">(</code><code>'¿Ingles con maestros nativos?'</code><code className="code pink">);</code></pre>
              <pre className="pre-code"><code className="code green">ask</code><code className="code pink">(</code><code>'¿Ayudar a la comunidad?'</code><code className="code pink">);</code></pre>
              <pre className="pre-code typing"><code className="code green">ask</code><code className="code pink">(</code><code>'¿Quieres aprender?'</code><code className="code pink">);   </code></pre>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
