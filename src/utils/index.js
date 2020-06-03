//------------------------------------------------------------------------跳转到navigateTo链接
/*url是需要跳转的链接 */
export function formatNavigateTo(url) {
    wx.navigateTo({
        url: url
    });
}
