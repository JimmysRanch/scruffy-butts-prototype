import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Scruffy Butts Grooming</h1>
      <p>Friendly, professional dog grooming in Natalia, TX. Book online 24/7.</p>
      <div>
        <Link href="/book" className="inline-block rounded bg-black text-white px-4 py-2">
          Book an Appointment
        </Link>
      </div>
      <section className="grid md:grid-cols-3 gap-4">
        {['Bath & Brush', 'Full Groom', 'Puppy Intro'].map((s, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold">{s}</h3>
            <p className="text-sm text-gray-600">
              Select during booking. Prices vary by breed/size/coat.
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
