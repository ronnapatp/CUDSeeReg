import Container from "@/components/container2"
import Meta from "@/components/meta"
import Image from 'next/image'

export default function about() {
    return (
      <Container>
        <Meta title="วิธีใช้" />
        <div className="mt-10">
            <h1 className="text-4xl font-bold">วิธีใช้</h1>
            <img src="/howtouse.png" width="100%" alt="How to use" />
        </div>
      </Container>
    )
  }
  