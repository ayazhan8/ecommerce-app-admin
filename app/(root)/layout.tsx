import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { userId } = auth();
    
    if (!userId) {
        redirect('/sign-in');
    }

    const storeId = await prismadb.store.findFirst({
        where: {
            userId
        }
    }).then((res) => {
        return res?.id;
    }).catch((err) => {
        console.log(err);
    });
    

    if (storeId !== undefined) {
        redirect(`/${storeId}`);
    }

    return (
        <>
            {children}
        </>
    )
}