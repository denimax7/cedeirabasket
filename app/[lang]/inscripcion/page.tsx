import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { InscripcionForm } from '@/components/forms/InscripcionForm'

export default async function InscripcionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const i = dict.inscripcion

  const steps = [i.step1, i.step2, i.step3, i.step4]

  return (
    <>
      <PageHero
        kicker={i.kicker}
        title={dict.pages.inscripcion.title}
        subtitle={i.introBody}
      />

      {/* Pasos */}
      <section className="bg-navy py-12">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-navy px-6 py-5 flex items-center gap-4">
                <span className="font-display font-black text-3xl text-white/20 leading-none flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="font-body text-sm text-white/80 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section className="bg-gray-100 py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none mb-10">
              {i.formTitle}
            </h2>
            <div className="bg-white p-8 sm:p-10">
              <InscripcionForm labels={i} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
