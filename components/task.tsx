import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

export interface Props {
  title: string;
  description: string;
  actions?: {
    component: () => JSX.Element;
  }[];
  status?: () => JSX.Element;
}

const Task = ({ task }: { task: Props }) => {
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col  space-y-4">
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </div>
          {task.actions &&
            task.actions.map(
              (action: { component: () => JSX.Element }, i: number) => (
                <div key={i}>{action.component()}</div>
              )
            )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default Task;
