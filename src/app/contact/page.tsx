
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="bg-muted/40">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
            <p className="text-muted-foreground mt-2 text-lg">We'd love to hear from you. Get in touch with us for any queries.</p>
        </div>

        <div className="grid md:grid-cols-1 gap-12 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Input id="first-name" placeholder="First name" />
                            </div>
                            <div className="space-y-2">
                                <Input id="last-name" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Input type="email" id="email" placeholder="Email address" />
                        </div>
                         <div className="space-y-2">
                            <Textarea id="message" placeholder="Your message" rows={5} />
                        </div>
                        <Button className="w-full">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
