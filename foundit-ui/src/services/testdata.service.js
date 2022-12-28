class TestDataService {
    getItems() {
        return {
            data: [
                {
                    _id: 1,
                    name: "Example Item 1",
                    imgUrl: "https://bulma.io/images/placeholders/1280x960.png",
                    category: "Stationary",
                    createdAt: "2022-11-11T17:46:26.833+00:00"
                },
                {
                    _id: 2,
                    name: "Example Item 2",
                    imgUrl: "https://bulma.io/images/placeholders/1280x960.png",
                    category: "Book",
                    createdAt: "2022-11-11T17:46:26.833+00:00"
                },
                {
                    _id: 3,
                    name: "Example Item 3",
                    imgUrl: "https://bulma.io/images/placeholders/1280x960.png",
                    category: "Phone/Electronic Device",
                    createdAt: "2022-11-11T17:46:26.833+00:00"
                }
            ]
        }
    }
}

export default new TestDataService()
