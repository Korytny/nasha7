<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the homepage as a single scrolling TanStack route; section anchors match the requested all-sections homepage.
- Keep channel content and media references in the browser-safe channel-data module to share stable data across interactive views.
- Use semantic CSS tokens for both themes and shared shadcn controls for interactions.
- Broadcast and submission forms are explicitly demonstrations until official streams and delivery services are connected; never claim a local interaction delivers data.
