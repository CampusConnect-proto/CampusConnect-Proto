
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-muted/40">
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
            <p className="text-muted-foreground mt-2 text-lg">We'd love to hear from you. Get in touch with us for any queries.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
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

             <div className="space-y-8">
                 <Card>
                     <CardHeader>
                         <CardTitle>Our Location</CardTitle>
                     </CardHeader>
                    <CardContent>
                         <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.275844465431!2d77.21698001508216!3d28.5915531824345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2db90a59c7b%3A0x1d53549646487e6!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1678886053891!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                     <CardHeader>
                         <CardTitle>Contact Information</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            {/* Wrap the icon in a fragment or cast it to satisfy TypeScript */}
{(MapPin as any) && <MapPin className="w-5 h-5 mt-1 text-primary"/>}
                            <div>
                                <h3 className="font-semibold text-foreground">Address</h3>
                                <p>123 University Lane, New Delhi, 110001, India</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 mt-1 text-primary"/>
                            <div>
                                <h3 className="font-semibold text-foreground">Email</h3>
                                <p>support@campusconnect.com</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="w-5 h-5 mt-1 text-primary"/>
                            <div>
                                <h3 className="font-semibold text-foreground">Phone</h3>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>
                     </CardContent>
                 </Card>
            </div>
        </div>
      </div>
    </div>
  )
}
