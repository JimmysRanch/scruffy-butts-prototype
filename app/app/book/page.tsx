import AppointmentForm from '@/components/AppointmentForm'

export default function BookPage() {
  return (
    <div className="grid gap-6">
      <AppointmentForm />
      <p className="text-sm text-gray-500">
        A small deposit may be required to confirm your slot. You’ll receive reminders.
      </p>
    </div>
  )
}
