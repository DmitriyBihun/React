import PageLayout from "../layouts/PageLayout";
import ContactList from "./Contact/ContactList";

function ContactPage() {

    return (
        <PageLayout>
            <h1>Random Contact</h1>
            <ContactList />
        </PageLayout>
    );
}

export default ContactPage;