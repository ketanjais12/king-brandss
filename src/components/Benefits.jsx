import {
  Truck,
  BadgeCheck,
  RefreshCcw,
  LockKeyhole,
} from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'PAN INDIA DELIVERY',
    description: 'Fast & Reliable Shipping',
  },
  {
    icon: BadgeCheck,
    title: 'TRUSTED SELLER',
    description: '100% Genuine Products',
  },
  {
    icon: RefreshCcw,
    title: 'EASY RETURNS',
    description: 'Hassle Free Returns',
  },
  {
    icon: LockKeyhole,
    title: 'SECURE PAYMENT',
    description: '100% Safe & Secure',
  },
];

function Benefits() {
  return (
    <section className="benefits" aria-label="Shopping benefits">
      {benefits.map(({ icon: Icon, title, description }) => (
        <div className="benefit" key={title}>
          <Icon size={28} strokeWidth={1.7} aria-hidden="true" />

          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Benefits;