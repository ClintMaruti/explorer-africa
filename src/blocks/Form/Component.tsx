'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button' // Assuming you have a shadcn/ui button
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { AlertTriangle, CheckCircle, Loader2, MailIcon, Phone } from 'lucide-react'

/* --- Helper Components for Readability --- */

// For sections like "Kenya" or "Tanzania"
const ContactInfoBlock: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-6 last:mb-0">
    <p className="text-base text-gold-darkest font-bold mb-2">{title}:</p>
    <div className="space-y-3">{children}</div>
  </div>
)

// For individual details like "Switch Board" or "Office Hours"
const ContactDetail: React.FC<{
  label: string
  children: React.ReactNode
  icon?: React.ReactNode
}> = ({ label, children, icon }) => (
  <div className="flex items-start">
    {icon && <div className="flex-shrink-0 mr-2 mt-1 text-gray-400">{icon}</div>}
    <div className="flex-grow">
      <p className="text-sm text-gray-500">{label}:</p>
      <div className="text-sm text-gray-700 leading-tight">{children}</div>
    </div>
  </div>
)

// For department contacts like "Marketing" or "Operations"
const DepartmentContact: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h4 className="text-base text-gold-darkest tracking-[0.3em] uppercase pb-2">{title}</h4>
    <div className="space-y-2 text-sm text-gray-700">{children}</div>
  </div>
)

const EmailLink: React.FC<{ email: string }> = ({ email }) => (
  <a
    href={`mailto:${email}`}
    className="flex items-center gap-2 transition-colors hover:text-gold-darkest"
  >
    <MailIcon className="w-4 h-4 flex-shrink-0" />
    <span className="break-all">{email}</span>
  </a>
)

/* --- Main Form Block Component --- */

export type FormBlockType = {
  anchorId?: string
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    anchorId,
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({ defaultValues: formFromProps.fields })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormFieldBlock[]) => {
      setIsLoading(true)
      setError(undefined)

      const dataToSend = Object.entries(data).map(([name, value]) => ({ field: name, value }))

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({ form: formID, submissionData: dataToSend }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        })
        const res = await req.json()

        if (!req.ok) {
          throw new Error(res.errors?.[0]?.message || 'An unknown error occurred.')
        }

        setHasSubmitted(true)
        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (err: any) {
        console.warn(err)
        setError({ message: err.message || 'Something went wrong.' })
      } finally {
        setIsLoading(false)
      }
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div id={anchorId} className="w-full bg-gray-100 py-16 sm:py-24 px-4">
      <div className="container max-w-7xl mx-auto">
        {enableIntro && introContent && !hasSubmitted && (
          <div className="max-w-4xl mx-auto flex justify-center">
            <RichText className="mb-12 lg:mb-16" data={introContent} enableGutter={false} />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Get in Touch</h3>
              <p className="text-base text-gold-darkest tracking-[0.2em] uppercase mb-8">
                Send us a message
              </p>

              <FormProvider {...formMethods}>
                {!hasSubmitted ? (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {formFromProps?.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      return Field ? (
                        <div key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      ) : null
                    })}

                    <Button
                      form={formID}
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto bg-gold-darkest text-white hover:bg-gold-700 focus-visible:ring-gold-500 px-8 py-3 text-base"
                    >
                      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      {isLoading ? 'Sending...' : submitButtonLabel}
                    </Button>
                  </form>
                ) : null}

                {/* Form States */}
                {hasSubmitted && confirmationType === 'message' && (
                  <div className="mt-6 flex flex-col items-center text-center p-6 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <RichText data={confirmationMessage} />
                  </div>
                )}
                {error && (
                  <div className="mt-6 flex items-start p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Error:</strong> {error.message}
                    </div>
                  </div>
                )}
              </FormProvider>
            </div>

            {/* Contact Info Section */}
            <div className="p-8 sm:p-10 bg-gray-50/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Contact Information</h3>
              <p className="text-base text-gold-darkest tracking-[0.2em] uppercase mb-8">
                Our Office Details
              </p>

              <ContactInfoBlock title="Kenya">
                <ContactDetail label="Switch Board" icon={<Phone size={16} />}>
                  +254 730 127 000 / +254 713 474 171
                </ContactDetail>
                <ContactDetail label="Office Hours">
                  Monday - Friday: 8am - 5pm <br /> Saturday: 9am - 1pm
                </ContactDetail>
                <ContactDetail label="Emergency Contact" icon={<Phone size={16} />}>
                  +254 713 474 171 / +254 731 700 084
                </ContactDetail>
              </ContactInfoBlock>

              <ContactInfoBlock title="Tanzania">
                {/* Populate with actual Tanzania details */}
                <ContactDetail label="Switch Board" icon={<Phone size={16} />}>
                  +255 XXX XXX XXX
                </ContactDetail>
                <ContactDetail label="Office Hours">
                  Monday - Friday: 8am - 5pm <br /> Saturday: 9am - 1pm
                </ContactDetail>
              </ContactInfoBlock>
            </div>
          </div>

          {/* Bottom Contact Section - UPDATED */}
          <div className="border-t border-gray-200 p-8 sm:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              <DepartmentContact title="Online Booking">
                <p className="text-gray-500 text-sm leading-none">
                  Check real time availability online at
                </p>
                <a
                  href="https://www.elewana.resrequest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold-darkest hover:underline break-all"
                >
                  elewana.resrequest.com
                </a>
              </DepartmentContact>

              {/* === MODIFIED SECTION START === */}
              <DepartmentContact title="Reservations & Support">
                {/* Specific Contact */}
                <div>
                  <p className="font-medium text-gray-800">Louis Okech</p>
                  <p className="text-xs text-gray-500 -mt-1 mb-1">Head of Reservations</p>
                  <EmailLink email="louis.okech@elewana.com" />
                </div>
              </DepartmentContact>
              {/* === MODIFIED SECTION END === */}

              <DepartmentContact title="Marketing">
                <p className="font-medium text-gray-800">Alina Haq</p>
                <p className="text-xs text-gray-500 -mt-1 mb-1">Director of Marketing</p>
                <EmailLink email="alina.haq@elewana.com" />
              </DepartmentContact>

              <DepartmentContact title="Operations">
                <p className="font-medium text-gray-800">Jarryd King</p>
                <p className="text-xs text-gray-500 -mt-1 mb-1">Hospitality Director</p>
                <EmailLink email="jarryd.king@elewana.com" />
              </DepartmentContact>
            </div>
          </div>
          {/* General & Duty Manager Contacts */}
          <div className="pt-3 my-3 border-t border-gray-200/80 flex text-sm items-center gap-2 justify-center">
            <p className="text-sm font-medium text-gray-800">Duty Manager & General:</p>
            <EmailLink email="reservations.dutymanager@elewana.com" />
            <EmailLink email="reservations@elewana.com" />
            <EmailLink email="info@elewana.com" />
          </div>
        </div>
      </div>

      {/* Elewana Global Sales and PR Representative */}
      <div className="w-full bg-gray-100 py-16 sm:py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <h4 className="text-base text-gold-darkest tracking-[0.4em] uppercase text-center">
            Elewana Global Sales and PR Representative
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
            <div className="col-span-1">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-gray-500 text-base font-bold border-b border-gold-dark pb-2">
                  Global Sales
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm  font-bold">Liz Harper</p>
                  <p className="text-gray-500 text-sm italic">UK Sales Representative</p>
                  <span className="flex items-center gap-2 text-gray-500 text-sm ">
                    <MailIcon className="w-4 h-4" />
                    <p className="text-gray-500 text-sm ">liz@lizharpertravel.com</p>
                  </span>
                  <p className="text-gray-500 text-sm ">+44 7957 231051</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm  font-bold">Rita Anagnostopoulos</p>
                  <p className="text-gray-500 text-sm italic">US Sales Representatives</p>
                  <span className="flex items-center gap-2 text-gray-500 text-sm ">
                    <MailIcon className="w-4 h-4" />
                    <p className="text-gray-500 text-sm ">rita@a2bmarketing.net</p>
                  </span>
                  <p className="text-gray-500 text-sm ">+1 954 626 8150</p>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-gray-500 text-base font-bold border-b border-gold-dark pb-2">
                  PR Representatives
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm  font-bold">Laura Shelbourne</p>
                  <p className="text-gray-500 text-sm italic">UUK Representative</p>
                  <span className="flex items-center gap-2 text-gray-500 text-sm ">
                    <MailIcon className="w-4 h-4" />
                    <p className="text-gray-500 text-sm ">laura@laurashelbourne.com</p>
                  </span>
                  <p className="text-gray-500 text-sm ">+44 7957 322275</p>
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm  font-bold">Alison Sager</p>
                  <p className="text-gray-500 text-sm italic">US Representative</p>
                  <span className="flex items-center gap-2 text-gray-500 text-sm ">
                    <MailIcon className="w-4 h-4" />
                    <p className="text-gray-500 text-sm ">alison@vivalifestylepr.com</p>
                  </span>
                  <p className="text-gray-500 text-sm ">+1 646 266 0387</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
