"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { ContactFormData } from '@/lib/types';

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

interface ContactFormProps {
  isCompact?: boolean;
  hideTitle?: boolean;
  className?: string;
}

export default function ContactForm({ isCompact = false, hideTitle = false, className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize react-hook-form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would send the form data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form.getValues()),
      // });

      // if (!response.ok) throw new Error('Failed to submit form');

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white ${isCompact ? 'p-4' : 'p-6'} rounded-lg ${!isCompact && 'shadow-sm border border-gray-200 hover:border-orange-300 transition-colors'} ${className}`}>
      {!hideTitle && !isCompact && <h2 className="text-2xl font-semibold mb-6">Contactez-<span className="text-orange-500">nous</span></h2>}

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-green-800 font-medium">Message Envoyé avec Succès</h3>
            <p className="text-green-700 mt-1">
              Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-green-300 hover:border-orange-500 hover:text-orange-500"
              onClick={() => setIsSuccess(false)}
            >
              Envoyer un Autre Message
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-${isCompact ? '4' : '6'}`}>
            <div className={`grid grid-cols-1 ${!isCompact && 'md:grid-cols-2'} gap-${isCompact ? '4' : '6'}`}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom"
                        {...field}
                        className="h-11 focus-visible:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre adresse email"
                        type="email"
                        {...field}
                        className="h-11 focus-visible:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage className="text-orange-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Objet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Objet du message"
                      {...field}
                      className="h-11 focus-visible:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage className="text-orange-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Votre message"
                      className={`${isCompact ? 'min-h-24' : 'min-h-40'} focus-visible:ring-orange-500`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-500" />
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="mt-2 w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer'
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
