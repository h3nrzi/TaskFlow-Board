import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { useLocation, Switch, Route, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { WorkspaceShell } from '@/app/workspace-shell';

const queryClient = new QueryClient();

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/">
          <WorkspaceShell />
        </Route>
        <Route path="/projects">
          <WorkspaceShell />
        </Route>
        <Route path="/projects/:id">
          <WorkspaceShell />
        </Route>
        <Route path="/tasks">
          <WorkspaceShell />
        </Route>
        <Route path="/settings">
          <WorkspaceShell />
        </Route>
        <Route path="/login">
          <WorkspaceShell />
        </Route>
        <Route path="/signup">
          <WorkspaceShell />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default Root;
