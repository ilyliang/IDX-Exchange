import {fetchProperties} from './client';

global.fetch = jest.fn();

test("fetchproperties succeeds", async () => {
    const mockProperties = [
        { L_ListingID: 1},
        { L_ListingID: 2 }
    ];

    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProperties)
    });

    const properties = await fetchProperties();
    expect(properties).toEqual(mockProperties);
});
