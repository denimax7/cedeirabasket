import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { ContactoForm } from '@/components/forms/ContactoForm'

export default async function ContactoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const c = dict.contacto
  const f = dict.footer

  const infoItems = [
    {
      label: c.addressLabel,
      value: f.address.replace('\n', ', '),
      href: 'https://maps.google.com/?q=Polideportivo+Municipal+Cedeira+Avenida+España+60+Cedeira',
    },
    {
      label: c.emailLabel,
      value: f.email,
      href: `mailto:${f.email}`,
    },
    {
      label: c.phoneLabel,
      value: f.phone,
      href: `tel:+34${f.phone.replace(/\s/g, '')}`,
    },
    {
      label: c.hoursLabel,
      value: c.hoursValue,
      href: null,
    },
  ]

  return (
    <>
      <PageHero
        kicker={c.kicker}
        title={dict.pages.contacto.title}
        subtitle={c.infoBody}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Info column */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-black leading-none mb-8">
                {c.infoTitle}
              </h2>
              <dl className="flex flex-col gap-6">
                {infoItems.map(({ label, value, href }) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body mb-1">
                      {label}
                    </dt>
                    <dd>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-body text-sm text-gray-800 hover:text-blue transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="font-body text-sm text-gray-800">{value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Map embed */}
              <div className="mt-8 rounded overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.9!2d-8.0494!3d43.6548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2ee4b0!2sPolideportivo%20Municipal%20de%20Cedeira!5e0!3m2!1ses!2ses!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-black leading-none mb-8">
                {c.formTitle}
              </h2>
              <ContactoForm labels={c} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
