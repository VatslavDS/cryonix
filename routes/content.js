var PostsDAO = require('../posts').PostsDAO
  , sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db){
    "use strict";
    this.displayMainPage = function(req, res, next) {
        "use strict";

            return res.render('index', {
                title: 'Cryonix'
            });
    }

    this.displayAbout = function(req, res, next){
      "use strict";

      return res.render('about', {
        title: 'about',
        username: req.username
      });
    }

    this.displayNewPostPage = function(req, res, next) {
        "use strict";

        if (!req.username) return res.redirect("/login");

        return res.render('newpost_template', {
            subject: "",
            body: "",
            errors: "",
            tags: "",
            username: req.username
        });
    }

    function extract_tags(tags) {
        "use strict";

        var cleaned = [];

        var tags_array = tags.split(',');

        for (var i = 0; i < tags_array.length; i++) {
            if ((cleaned.indexOf(tags_array[i]) == -1) && tags_array[i] != "") {
                cleaned.push(tags_array[i].replace(/\s/g,''));
            }
        }

        return cleaned
    }

    this.handleNewPost = function(req, res, next) {
        "use strict";

        var title = req.body.subject
        var post = req.body.body
        var tags = req.body.tags

        if (!req.username) return res.redirect("/signup");

        if (!title || !post) {
            var errors = "Post must contain a title and blog entry";
            return res.render("newpost_template", {subject:title, username:req.username, body:post, tags:tags, errors:errors});
        }

        var tags_array = extract_tags(tags)

        // looks like a good entry, insert it escaped
        var escaped_post = sanitize(post).escape();

        // substitute some <br> for the paragraph breaks
        var formatted_post = escaped_post.replace(/\r?\n/g,'<br>');

        posts.insertEntry(title, formatted_post, tags_array, req.username, function(err, permalink) {
            "use strict";

            if (err) return next(err);

            // now redirect to the blog permalink
            return res.redirect("/post/" + permalink)
        });
    }

    this.handleLike = function(req, res, next) {
        "use strict";

        var permalink = req.body.permalink;
        permalink = sanitize(permalink).escape();

        var comment_ordinal = req.body.comment_ordinal;

        posts.getPostByPermalink(permalink, function(err, post) {
            "use strict";

            if (err) return next(err);

            if (!post) return res.redirect("/post_not_found");

            // it all looks good. increment the ordinal
            posts.incrementLikes(permalink, comment_ordinal, function(err, post) {
                "use strict";

                if (err) return next(err);

                // now redirect to the blog permalink
                return res.redirect("/post/" + permalink)
            });
        });
    }

}

module.exports = ContentHandler;
