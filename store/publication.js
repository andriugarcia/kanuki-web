import gql from "graphql-tag"

export const actions = {
    async remove(context, {card, index = -1, pill}) {
        let client = this.app.apolloProvider.defaultClient
        await client.mutate({
            mutation: gql`mutation RemovePublication($card: String!, $cardAuthor: String!, $pill: String!) {
                removePublication(card: $card, cardAuthor: $cardAuthor, pill: $pill) {
                    name
                }
            }`,
            variables: {
                card: card.name,
                cardAuthor: context.rootState.auth.user.name,
                pill: index != -1 ? card.publications[index].pill.name : pill
            }
        })
    }

}
