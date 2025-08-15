import { type Event } from "../stores/useEventStore"
export const SampleEvent: Event =
{
  id: "event-1",
  title: "첫 번째 이벤트",
  nodes: [
    {
      id: "node-1",
      title: "주인공이 숲에 들어간다",
      text: "앞에도 숲, 뒤에도 숲. 그야말로 사방이 숲입니다. \n들어가야겠죠...",
      next: [
        { id: "node-1__node-2", from: "node-1", to: "node-2" },
        { id: "node-1__node-3", from: "node-1", to: "node-3" },
      ],
      color: "#FF5733",
    },
    {
      id: "node-2",
      title: "왼쪽 길로 간다",
      text: "책을 읽을 때 왼쪽부터 읽듯, 당신은 왼쪽을 선택했습니다. 맞는 선택일까요?",
      next: [
        { id: "node-2__node-4", from: "node-2", to: "node-4" },
      ],
      color: "#33FF57",
    },
    {
      id: "node-3",
      title: "오른쪽 길로 간다",
      text: "누군가가, 오른 쪽이 옳은 쪽이라고 말했던 것 같습니다. 당신은 그가 옳은 말을 햇길 바라며 전진합니다.",
      next: [
        { id: "node-3__node-4", from: "node-3", to: "node-4" },
      ],
      color: "#3357FF",
    },
    {
      id: "node-4",
      title: "오두막 발견",
      text: "세월의 흐름을 정통으로 맞은 듯한 오두막길입니다. 음... 저기서 자면 시원하겠네요!",
      next: [],
      color: "#F3FF33",
    },
  ],
};