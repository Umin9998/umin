import { redirect } from "next/navigation";
export default function Home({ params }: any) {
  //redirect('base/home');
  //redirect('base/storymaker/kr/view/page/home');
  //redirect('tests/umin/test03');
  redirect("test/kr/test1/home");
}
