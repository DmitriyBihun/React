import { lazy, Suspense } from "react";

const PriceChart = lazy(() => import('./PriceChart.lazy'))

function ChartWrapper() {
    <div
        style={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '.5rem',
            backgroundColor: '#fff',
            marginTop: '1rem',
            height: '31.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }} />
            <p style={{ color: '#666' }}>Завантаження графіка...</p>
        </div>
    </div>
}
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

const LazyPriceChart = (props) => {
    return (
        <Suspense fallback={<ChartWrapper />}>
            <PriceChart {...props} />
        </Suspense>
    );
};

export default LazyPriceChart;